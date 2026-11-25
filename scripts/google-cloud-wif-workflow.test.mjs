import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(new URL('../.github/workflows/google-cloud-wif-test.yml', import.meta.url), 'utf8');

describe('Google Cloud WIF workflow security', () => {
  it('checks out the repository before creating workspace credentials', () => {
    const checkout = workflow.indexOf('uses: actions/checkout@93cb6efe18208431cddfb8368fd83d5badbf9bfd');
    const auth = workflow.indexOf('uses: google-github-actions/auth@c200f3691d83b41bf9bbd8638997a462592937ed');
    const setup = workflow.indexOf('uses: google-github-actions/setup-gcloud@e427ad8a34f8676edf47cf7d7925499adf3eb74f');
    expect(checkout).toBeGreaterThan(-1);
    expect(auth).toBeGreaterThan(checkout);
    expect(setup).toBeGreaterThan(auth);
    expect(workflow).toContain('persist-credentials: false');
    expect(workflow).toContain('create_credentials_file: true');
  });

  it('uses only manual dispatch and least-privilege WIF permissions', () => {
    expect(workflow).toContain('workflow_dispatch:');
    expect(workflow).toContain('contents: read');
    expect(workflow).toContain('id-token: write');
    expect(workflow).toContain('vars.WIF_PROVIDER');
    expect(workflow).toContain('vars.WIF_SERVICE_ACCOUNT');
    expect(workflow).not.toContain('secrets.');
    expect(workflow).not.toContain('gcloud services enable');
    expect(workflow).not.toContain('gcloud run deploy');
  });
});
