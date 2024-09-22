# Lambda Functions for POS System

This repository contains the Lambda functions required to implement a Point of Sale (POS) system using AWS. The functions are developed in Node.js and are set up to interact with a DynamoDB table.

## Repository Structure
```
lambda-functions-repo/
  ├── src/
  │   ├── add-product/
  │   │   └── index.js
  │   ├── list-products/
  │   │   └── index.js
  │   ├── delete-product/
  │       └── index.js
  ├── template.yaml
  ├── .github/
  │   └── workflows/
  │       └── deploy.yaml

```

- `src/`: Contains the source code for the Lambda functions.
- `template.yaml`: AWS SAM template defining the infrastructure, including the Lambda functions and their permissions.
- `.github/workflows/deploy.yaml`: CI/CD pipeline configuration for deploying the functions using GitHub Actions.

## Deployment
This repository uses AWS SAM for packaging and deploying Lambda functions to AWS. The deployment process is automated using GitHub Actions. To manually deploy from your local machine:

1. Install dependencies:
```
npm install
```

2. Build the project:
```
sam build
```

3. Deploy the stack:
```
sam deploy --stack-name pos-lambda-functions --resolve-s3 --capabilities CAPABILITY_IAM --profile <YOUR-PROFILE>
```

```
sam deploy --stack-name pos-lambda-functions --resolve-s3 --capabilities CAPABILITY_IAM --profile <YOUR-PROFILE> --force-upload
```

## Removing the CloudFormation Stack
In case of errors like ``ROLLBACK_COMPLETE, you might need to delete the CloudFormation stack manually before deploying again.

### Delete the Stack via AWS Console:
1. Log in to the AWS Console.
2. Navigate to CloudFormation.
3. Select the problematic stack (pos-lambda-functions).
Click "Delete".

### Delete the Stack using AWS CLI:
Run the following command:

```
aws cloudformation delete-stack --stack-name pos-lambda-functions --profile <YOUR-PROFILE>
```
