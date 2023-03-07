import { getAllProducts, getProductById } from "@functions/index";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-auto-swagger", "serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    httpApi: {
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: ["GET"],
      },
    },
  },
  // import the function via paths
  functions: { getAllProducts, getProductById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      apiType: "httpApi",
      generateSwaggerOnDeploy: true,
      basePath: `/`,
      typefiles: ["./src/types/index.ts"],
    },
  },
};

module.exports = serverlessConfiguration;
