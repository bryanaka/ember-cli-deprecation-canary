const hasOwnProperty = Object.prototype.hasOwnProperty;

export default class DeprecationTracker {
  constructor(workflow) {
    this.idIndexedMatchers = {};
    this.messageIndexedMatchers = {};
    this.regexMatchers = [];
    this.newDeprecations = {};
    this.deprecationCacheHits = {
      id: {},
      message: {},
      regex: {}
    };
    this._assignDeprecations(workflow);
  }

  recordDeprecation(message, options) {
    var deprecationExistsInWorkflow = this.hasDeprecation(message, options);

    if (deprecationExistsInWorkflow) {
      this._recordDeprecationCacheHit(message, options);
      return;
    }

    var matchedRegexDeprecation = this.matchesRegexDeprecation(message);

    if (matchedRegexDeprecation) {
      this.deprecationCacheHits.regex[matchedRegexDeprecation] = true;
      return;
    }

    var key = this._getDeprecationKey(message, options);
    this.newDeprecations[key] = true
  }

  generateDeprecationStats() {
    var newDeprecations = Object.keys(this.newDeprecations);
    var notFoundDeprecations = this._getDeprecationsNotFound();

    return {
      newDeprecations: newDeprecations,
      notFoundDeprecations: notFoundDeprecations
    };
  }

  hasDeprecation(message, options) {
    var key = this._getDeprecationKey(message, options);
    return this.idIndexedMatchers[key] || this.messageIndexedMatchers[key] || this.newDeprecations[key];
  }

  matchesRegexDeprecation(message) {
    return this.regexMatchers.find(regexMatcher => regexMatcher.test(message));
  }

  _getDeprecationsNotFound() {
    var idMatchersNotFound = this._filterFoundDeprecations(this.deprecationCacheHits.id);
    var messageMatchersNotFound = this._filterFoundDeprecations(this.deprecationCacheHits.message);
    var regexMatchersNotFound = this._filterFoundDeprecations(this.deprecationCacheHits.regex);

    return {
      matchId: idMatchersNotFound,
      matchMessage: messageMatchersNotFound,
      matchMessageRegex: regexMatchersNotFound
    };
  }

  _filterFoundDeprecations(cache) {
    return Object.keys(cache).filter(function(deprecationKey) {
      return !cache[deprecationKey];
    });
  }

  _getDeprecationKey(message, options) {
    var matchId = options && options.id;
    return matchId || message;
  }

  _recordDeprecationCacheHit(message, options) {
    var key = this._getDeprecationKey(message, options);

    if (hasOwnProperty(this.deprecationCacheHits.id, key)) {
      this.deprecationCacheHits.id[key] = true;

    } else if (hasOwnProperty(this.deprecationCacheHits.message, key)) {
      this.deprecationCacheHits.message[key] = true;

    } else {
      throw new Error('Tried to record a cache hit for a deprecation ' + key + ' but did not find it in the hit cache');
    }
  }

  _assignDeprecations(workflow) {
    var matcher;
    workflow = workflow || [];

    workflow.forEach(deprecation => {
      if (deprecation.matchId) {
        this.idIndexedMatchers[deprecation.matchId] = true;
        this.deprecationCacheHits.id[deprecation.matchId] = false;

      } else if (deprecation.matchMessage) {
        matcher  = deprecation.matchMessage;

        if (typeof matcher === 'string') {
          this.messageIndexedMatchers[matcher] = true;
          this.deprecationCacheHits.message[matcher] = false;

        } else if (matcher instanceof RegExp) {
          this.regexMatchers.push(matcher);
          this.deprecationCacheHits.regex[matcher] = false;
        }
      }
    });
  }
}
