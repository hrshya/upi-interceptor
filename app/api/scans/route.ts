import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

console.log('Scans API env debug', {
  hasAccessKey: Boolean(process.env.APP_AWS_ACCESS_KEY_ID),
  hasSecretKey: Boolean(process.env.APP_AWS_SECRET_ACCESS_KEY),
  region: process.env.APP_AWS_REGION,
  table: process.env.DYNAMODB_TRANSACTIONS_TABLE,
});

const awsRegion = process.env.APP_AWS_REGION || 'ap-south-1';
const tableName = process.env.DYNAMODB_TRANSACTIONS_TABLE || 'MerchantTransactions';

const client = new DynamoDBClient({
  region: awsRegion,
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY || '',
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId') || 'STORE_9921';

  const hasAccessKey = Boolean(process.env.APP_AWS_ACCESS_KEY_ID);
  const hasSecretKey = Boolean(process.env.APP_AWS_SECRET_ACCESS_KEY);

  if (!hasAccessKey || !hasSecretKey) {
    console.error('Scans API deployment config missing:', {
      APP_AWS_REGION: awsRegion,
      hasAccessKey,
      hasSecretKey,
      DYNAMODB_TRANSACTIONS_TABLE: tableName,
    });

    return NextResponse.json(
      {
        error: 'Missing AWS deployment credentials. Set APP_AWS_ACCESS_KEY_ID and APP_AWS_SECRET_ACCESS_KEY in the deployed environment.',
      },
      { status: 500 }
    );
  }

  try {
    const response = await docClient.send(new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'merchant_id = :mid',
      ExpressionAttributeValues: { ':mid': merchantId },
      ScanIndexForward: false,
    }));

    return NextResponse.json(response.Items || []);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch merchant scans.';
    console.error('Scans API DynamoDB error:', {
      merchantId,
      tableName,
      awsRegion,
      message,
      error,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
