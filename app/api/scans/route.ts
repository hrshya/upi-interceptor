import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const client = new DynamoDBClient({
  region: process.env.APP_AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY || '',
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId') || 'STORE_9921';

  try {
    const response = await docClient.send(new QueryCommand({
      TableName: process.env.DYNAMODB_TRANSACTIONS_TABLE || 'MerchantTransactions',
      KeyConditionExpression: 'merchant_id = :mid',
      ExpressionAttributeValues: { ':mid': merchantId },
      ScanIndexForward: false,
    }));

    return NextResponse.json(response.Items || []);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch merchant scans.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
