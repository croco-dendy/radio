import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.navigator = dom.window.navigator;
