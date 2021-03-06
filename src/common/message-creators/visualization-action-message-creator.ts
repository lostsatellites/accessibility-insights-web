// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { VisualizationTogglePayload } from '../../background/actions/action-payloads';
import { ToggleTelemetryData } from '../../common/telemetry-events';
import { Messages } from '../messages';
import { VisualizationType } from '../types/visualization-type';
import { BaseActionMessageCreator } from './base-action-message-creator';

export class VisualizationActionMessageCreator extends BaseActionMessageCreator {
    public setVisualizationState(test: VisualizationType, enabled: boolean, telemetry: ToggleTelemetryData): void {
        const payload: VisualizationTogglePayload = {
            test,
            enabled,
            telemetry,
        };

        const message: Message = {
            tabId: this._tabId,
            type: Messages.Visualizations.Common.Toggle,
            payload,
        };

        this.dispatchMessage(message);
    }
}
