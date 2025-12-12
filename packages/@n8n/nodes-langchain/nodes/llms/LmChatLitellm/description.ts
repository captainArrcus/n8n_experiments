import type { INodeProperties, INodeTypeDescription } from 'n8n-workflow';

export const litellmDescription: Partial<INodeTypeDescription> = {
	credentials: [
		{
			name: 'litellmApi',
			required: true,
		},
	],
	requestDefaults: {
		ignoreHttpStatusErrors: true,
		baseURL:
			'={{ $credentials.baseUrl.endsWith("/") ? $credentials.baseUrl.slice(0, -1) : $credentials.baseUrl }}',
	},
};

export const litellmModel: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	default: '',
	description:
		'The model which will generate the completion. The available models are fetched from your LiteLLM server.',
	typeOptions: {
		loadOptions: {
			routing: {
				request: {
					method: 'GET',
					url: '/v1/models',
				},
				output: {
					postReceive: [
						{
							type: 'rootProperty',
							properties: {
								property: 'data',
							},
						},
						{
							type: 'setKeyValue',
							properties: {
								name: '={{$responseItem.id}}',
								value: '={{$responseItem.id}}',
							},
						},
						{
							type: 'sort',
							properties: {
								key: 'name',
							},
						},
					],
				},
			},
		},
	},
	routing: {
		send: {
			type: 'body',
			property: 'model',
		},
	},
	required: true,
};

export const litellmOptions: INodeProperties = {
	displayName: 'Options',
	name: 'options',
	placeholder: 'Add Option',
	description: 'Additional options to add',
	type: 'collection',
	default: {},
	options: [
		{
			displayName: 'Sampling Temperature',
			name: 'temperature',
			default: 0.7,
			typeOptions: { maxValue: 2, minValue: 0, numberPrecision: 1 },
			description:
				'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
			type: 'number',
		},
		{
			displayName: 'Maximum Number of Tokens',
			name: 'maxTokens',
			default: -1,
			description:
				'The maximum number of tokens to generate in the completion. Set to -1 for no limit.',
			type: 'number',
			typeOptions: {
				minValue: -1,
			},
		},
		{
			displayName: 'Top P',
			name: 'topP',
			default: 1,
			typeOptions: { maxValue: 1, minValue: 0, numberPrecision: 1 },
			description:
				'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.',
			type: 'number',
		},
		{
			displayName: 'Frequency Penalty',
			name: 'frequencyPenalty',
			default: 0,
			typeOptions: { maxValue: 2, minValue: -2, numberPrecision: 1 },
			description:
				"Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim",
			type: 'number',
		},
		{
			displayName: 'Presence Penalty',
			name: 'presencePenalty',
			default: 0,
			typeOptions: { maxValue: 2, minValue: -2, numberPrecision: 1 },
			description:
				"Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics",
			type: 'number',
		},
		{
			displayName: 'Timeout',
			name: 'timeout',
			default: 60000,
			description: 'Maximum amount of time a request is allowed to take in milliseconds',
			type: 'number',
		},
		{
			displayName: 'Max Retries',
			name: 'maxRetries',
			default: 2,
			description: 'Maximum number of retries to attempt',
			type: 'number',
		},
	],
};
