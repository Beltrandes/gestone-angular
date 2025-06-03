import { BillStatusPipe } from './bill-status.pipe';

describe('BillStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new BillStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
