// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as React from 'react';

import { VisualizationType } from '../../common/types/visualization-type';
import { test as content } from '../../content/test';
import { AssessmentBuilder } from '../assessment-builder';
import { ErrorIdentification } from './test-steps/error-identification';
import { ErrorPrevention } from './test-steps/error-prevention';
import { ErrorSuggestion } from './test-steps/error-suggestion';

const key = 'errors';
const title = 'Errors';
const { guidance } = content.errors;

const gettingStarted: JSX.Element = (
    <React.Fragment>
        As much as possible, websites and web apps should help users avoid making mistakes, especially mistakes with consequences that can't
        be reversed, such as buying non-refundable airline tickets or transferring money to a bank account. When users do make a data entry
        error, they need to easily find it and fix it.
    </React.Fragment>
);

export const ErrorsAssessment = AssessmentBuilder.Manual({
    type: VisualizationType.ErrorsAssessment,
    key,
    title,
    gettingStarted,
    guidance,
    steps: [ErrorIdentification, ErrorSuggestion, ErrorPrevention],
});
