// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { isEmpty, size } from 'lodash';
import * as React from 'react';

import { ManualTestStatus } from '../common/types/manual-test-status';
import { IAssessmentInstancesMap, InstanceIdToInstanceDataMap, ITestStepResult } from '../common/types/store-data/iassessment-result-data';

export type IMessageGenerator = (instancesMap: IAssessmentInstancesMap, selectedTestStep: string) => DefaultMessageInterface;
export type IGetMessageGenerator = (generator: AssessmentDefaultMessageGenerator) => IMessageGenerator;
export interface DefaultMessageInterface {
    message: JSX.Element;
    instanceCount: number;
}

function failingInstances(result: ITestStepResult): boolean {
    return result.status !== ManualTestStatus.PASS;
}

function passingInstances(result: ITestStepResult): boolean {
    return result.status === ManualTestStatus.PASS;
}

function getRelevantTestStepResults(instancesMap: InstanceIdToInstanceDataMap, selectedTestStep: string): ITestStepResult[] {
    const getSelectedTestStepResult: (instance: string) => ITestStepResult = (instance: string) => {
        return instancesMap[instance].testStepResults[selectedTestStep];
    };

    return Object.keys(instancesMap)
        .map(getSelectedTestStepResult)
        .filter(ob => ob);
}

export class AssessmentDefaultMessageGenerator {
    public getNoFailingInstanceMessage: IMessageGenerator = (
        instancesMap: InstanceIdToInstanceDataMap,
        selectedTestStep: string,
    ): DefaultMessageInterface => {
        if (isEmpty(instancesMap)) {
            return this.getNoMatchingInstancesResult();
        }

        const relevantTestStepResults = getRelevantTestStepResults(instancesMap, selectedTestStep);

        const passingInstanceKeys = relevantTestStepResults.filter(passingInstances);
        const failingInstanceKeys = relevantTestStepResults.filter(failingInstances);

        if (isEmpty(failingInstanceKeys) && !isEmpty(relevantTestStepResults)) {
            return this.getNoFailingInstanceResult(passingInstanceKeys);
        }

        return this.checkRelevantTestSteps(instancesMap, selectedTestStep);
    };

    public getNoMatchingInstanceMessage: IMessageGenerator = (
        instancesMap: InstanceIdToInstanceDataMap,
        selectedTestStep: string,
    ): DefaultMessageInterface => {
        if (isEmpty(instancesMap)) {
            return this.getNoMatchingInstancesResult();
        }

        return this.checkRelevantTestSteps(instancesMap, selectedTestStep);
    };

    private getNoMatchingInstancesResult(): DefaultMessageInterface {
        return {
            message: <div className="no-failure-view">No matching instances</div>,
            instanceCount: 0,
        };
    }

    private getNoFailingInstanceResult(passingInstanceKeys: ITestStepResult[]): DefaultMessageInterface {
        return {
            message: <div className="no-failure-view">No failing instances</div>,
            instanceCount: size(passingInstanceKeys),
        };
    }

    private checkRelevantTestSteps(instancesMap: InstanceIdToInstanceDataMap, selectedTestStep: string): DefaultMessageInterface {
        const relevantTestStepResults = getRelevantTestStepResults(instancesMap, selectedTestStep);
        if (isEmpty(relevantTestStepResults)) {
            return this.getNoMatchingInstancesResult();
        }
        return null;
    }
}
