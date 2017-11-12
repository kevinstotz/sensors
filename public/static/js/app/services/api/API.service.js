'use strict';

hotPotatoEngineApp.service('API', [ '$resource', function($resource)  {
    var _method;
    var _action;
    var _url;
    var _paramsList;
    var _headersContentType;
    var _headersAuthorization;
    var _stripTrailingSlashes;
    var _resource;
    var _isArray;

    this.callResource = function () {
        return $resource (
            this._url,
            {
            },
            {
                query: {
                    method: this._method,
                    headers: {'Content-Type': this._headersContentType, 'Authorization': this._headersAuthorization},
                    isArray: this._isArray
                },
                get: {
                    method: this._method,
                    headers: {'Content-Type': this._headersContentType, 'Authorization': this._headersAuthorization},
                    isArray: this._isArray
                },
                delete: {
                    method: this._method,
                    headers: {'Content-Type': this._headersContentType, 'Authorization': this._headersAuthorization},
                    isArray: this._isArray
                },
                save: {
                    method: this._method,
                    params: this._paramsList,
                    headers: {'Content-Type': this._headersContentType, 'Authorization': this._headersAuthorization},
                    isArray: this._isArray
                },
                update: {
                    method: this._method,
                    params: this._paramsList,
                    headers: {'Content-Type': this._headersContentType, 'Authorization': this._headersAuthorization},
                    isArray: this._isArray
                }
            },
            {
                 stripTrailingSlashes: this._stripTrailingSlashes
            }
        );
    }

    this.getResource = function() {
        return this._resource;
    }

    this.getParams = function() {
        return this._paramsList;
    }

    this.getAction = function () {
        return this._action;
    }

    this.getMethod = function () {
        return this._method;
    }

    this.getIsArray = function () {
        return this._isArray;
    }

    this.getUrl = function () {
        return this._url;
    }

    this.getHeadersContentType = function () {
        return this._headersContentType;
    }

    this.getHeadersAuthorization = function () {
        return this._headersAuthorization;
    }

    this.getStripTrailingSlashes = function () {
        return this._stripTrailingSlashes;
    }

    this.setParams = function(params) {
        //{game_id: '@game_id'}
        this._paramsList = JSON.stringify(params);
        this._paramsList = params;
    }

    this.setMethod = function (method) {
        this._method = method;
    }

    this.setAction = function (action) {
        this._action = action;
    }

    this.setIsArray = function (isArray) {
        this._isArray = isArray;
    }

    this.setUrl = function (url) {
        this._url = url;
    }

    this.setHeadersContentType = function (headersContentType) {
        this._headersContentType = headersContentType;
    }

    this.setHeadersAuthorization = function (headersAuthorization) {
        this._headersAuthorization = headersAuthorization;
    }

    this.setStripTrailingSlashes = function (stripTrailingSlashes) {
        this._stripTrailingSlashes = stripTrailingSlashes;
    }

    this.setResource = function (resource) {
        this._resource = this.callResource();
    }

}]);
