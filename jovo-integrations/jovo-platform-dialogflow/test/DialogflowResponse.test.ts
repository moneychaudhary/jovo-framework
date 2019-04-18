

import {DialogflowResponse} from "../src/core/DialogflowResponse";
import _cloneDeep = require('lodash.clonedeep');
const askJSON = require('./../sample-response-json/v2/ASK.json');
const tellJSON = require('./../sample-response-json/v2/TELL.json');

process.env.NODE_ENV = 'TEST';

test('test hasState', () => {
    const responseWithState = DialogflowResponse.fromJSON(_cloneDeep(askJSON));

    expect(responseWithState.hasState('test')).toBe(true);
    expect(responseWithState.hasState('test123')).toBe(false);
    expect(responseWithState.hasState()).toBe(true);

    const responseWithoutState = DialogflowResponse.fromJSON(_cloneDeep(tellJSON));
    expect(responseWithoutState.hasState('test123')).toBe(false);
    expect(responseWithoutState.hasState()).toBe(false);
});

test('test hasSessionData', () => {
    const responseWithState = DialogflowResponse.fromJSON(_cloneDeep(askJSON));

    expect(responseWithState.hasSessionData("session", "attribute")).toBe(true);
    expect(responseWithState.hasSessionData("session", "closed")).toBe(false);

    expect(responseWithState.hasSessionData("session")).toBe(true);
    expect(responseWithState.hasSessionData("age")).toBe(false);
});

test('test hasDisplayText', () => {
    const responseWithState = DialogflowResponse.fromJSON(_cloneDeep(askJSON));

    expect(responseWithState.hasDisplayText('Sample Display Text')).toBe(true);
    expect(responseWithState.hasDisplayText('test123')).toBe(false);
    expect(responseWithState.hasDisplayText()).toBe(true);

    const responseWithoutState = DialogflowResponse.fromJSON(_cloneDeep(tellJSON));
    expect(responseWithoutState.hasDisplayText('test123')).toBe(false);
    expect(responseWithoutState.hasDisplayText()).toBe(false);
});
