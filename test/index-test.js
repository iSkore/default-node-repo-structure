/** ****************************************************************************************************
 * File: index-test.js
 * Project: default-node-package
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 19-Oct-2017
 *******************************************************************************************************/
'use strict';

const
    chai     = require( 'chai' ),
    expect   = chai.expect;

/**
 * Tests
 * @constructor
 * @example tests
 */
describe( 'default-node-package', () => {
    it( 'should do nothing',
        () => {
            expect().to.eql();
        }
    );
} );