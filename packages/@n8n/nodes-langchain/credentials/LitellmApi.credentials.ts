import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LitellmApi implements ICredentialType {
	name = 'litellmApi';

	displayName = 'LiteLLM';

	documentationUrl = 'litellm';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			required: true,
			type: 'string',
			default: 'http://localhost:4000',
			description: 'The base URL of your LiteLLM server',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: false,
			description: 'Optional API key for authentication with LiteLLM server',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/v1/models',
			method: 'GET',
		},
	};
}
