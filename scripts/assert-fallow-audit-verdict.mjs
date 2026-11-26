const verdict = process.env.FALLOW_AUDIT_VERDICT ?? '';

if (verdict !== 'pass') {
  console.error(`Fallow audit did not pass (verdict: ${verdict || 'missing'}).`);
  process.exitCode = 1;
} else {
  console.log('Fallow audit passed.');
}
