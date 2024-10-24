#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import fs from "fs";
import { TYPES } from "@cny-common/aws.cdk.ts";
import { ApiGenStack } from "./ApiGenStack";
import { generateResourceName } from "@cny-helpers/nodejs";

const app = new cdk.App();

const extendedGroupEndpoints: TYPES.ExtendedGroupEndpoints = JSON.parse(fs.readFileSync("./inputs.json", "utf-8"));

// export function deploy(extendedGroupEndpoints: TYPES.ExtendedGroupEndpoints) {

     for (const [deploymentGroup, deploymentGroupObj] of Object.entries(extendedGroupEndpoints)) {
          const gatewayName = Object.keys(deploymentGroupObj)[0];
          const { stage, productShortName, orgShortName } = deploymentGroupObj[gatewayName];
          const stackName = generateResourceName({
               stage,
               productShortName,
               orgShortName,
               resourceConstant: `${deploymentGroup}`,
          });

          const stack = new ApiGenStack(app, stackName, extendedGroupEndpoints);
          stack.deploy();
     }
     
// }

const data = {
     "dummy-api-gen-api-stack": {
          "dummy-api-gateway": {
               "account": "1949874554",
               "region": "ap-southeast-2",
               "separateHostedZones": false,
               "productId":"gi", "orgShortName":"oi",
               "ssmKeys": {
                    "git": {
                         "gitTokenSsmPath": "/git/gitToken",
                         "gitUsernameKeySsmPath": "/git/gitUsername",
                         "userNameSsmPath": "/git/userName",
                         "proxyDomainSsmPath": "/git/gitProxyDomain"
                    },
                    "jobs": {"templateRepoKeySsmPath": "/jobs/api/templateRepoName"},
                    "chatAgent": {"chatAgentKeySsmPath": "/chatAgent/chatAgentDomain"}
               },
               "singleRepo": false,
               "repoName": "cnyp-8mfj3gpuhd",
               "productShortName": "cny",
               "fileLocation": "Local",
               "resources": {},
               "features": {
                    "Authentication": {
                         "Name": "Authentication",
                         "Props": "key"
                    },
                    "ErrorHandler": {
                         "Name": "ErrorHandler",
                         "Props": "key"
                    },
                    "DiscoveryService": {
                         "key": "adra"
                    }
               },
               "schemas": {
                    "process": "process.js"
               },
               "schemaFileBasePath": "../pipeline/requirements/schemas",
               "responseFileBasePath": "../pipeline/requirements/responses",
               "endpointsInfoArray": [
                    {
                         "projectName": "cogniyonPlatform",
                         "projectShortName": "cnyp",
                         "resourceName": "dummy",
                         "path": "/start",
                         "httpMethod": "POST",
                         "id": 1,
                         "singleRepo": false,
                         "distributed": false,
                         "stage": "dev",
                         "deploymentGroup": "api-gen-api-stack",
                         "gatewayGroup": "api-gateway",
                         "apiGatewayType": "http",
                         "serverUrl": "api-dev.talksite.ai",
                         "supportedSignIns": [],
                         "version": "v1",
                         "pathPrefix": "/jobs",
                         "requestQueryParams": null,
                         "requestHeaders": null,
                         "requestBody": null,
                         "responseHeader": null,
                         "responseBody": null,
                         "language": "nodejs",
                         "envVariables": ["DynamoDBTable", "Stage"],
                         "responsesFile": "apigen-job-producer.responses.json",
                         "serverType": "AwsServerless",
                         "dependenciesRef": [],
                         "featuresRef": ["Authentication", "ErrorHandler", "DiscoveryService"],
                         "outputType": "Json",
                         "repoName": "cnyp-8mfj3gpuhd",
                         "endpointId": "cogniyonPlatform-8mfj3gpuhd-1-1",
                         "responseType": "Single",
                         "serviceMethodName": "apigen-job-producer",
                         "projectId": "8mfj3gpuhd",
                         "serviceId": "cnyp-apigen-job-producer",
                         "stackId": "",
                         "apigatewayId": "",
                         "apigatewayUrl": "",
                         "apiType": "ApiLambdaHelloWorld",
                         "operation": "Create",
                         "schemasRef": ["apigen"],
                         "sourceHttpMethod": "Create",
                         "permissions": [{"type": "AwsSQS", "name": "apigen-job-queue", "access": "SEND_MESSAGE"}]
                    }
               ],
               "stage": "dev",
               "outputType": "Json",
               "serverUrl": "api-dev.talksite.ai"
          }
     }
}


// deploy(data)
