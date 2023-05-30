const { deterministicPartitionKey } = require("./dpk");
const { getHex } = require('./crypto')

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the partition key ('1234567890') if is valid", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: '1234567890' });
    expect(trivialKey).toBe("1234567890");
  });
  it("Returns the new partition key if not exists", () => {
    const trivialKey = deterministicPartitionKey({  });
    expect(trivialKey).toEqual(expect.any(String));
  });
  it("Returns the stringify partition key if partition key is not string", () => {
    let trivialKey = deterministicPartitionKey({ partitionKey: 1234567890 });
    expect(trivialKey).toBe("1234567890");

    trivialKey = deterministicPartitionKey({ partitionKey: { key: 1234567890} });
    expect(trivialKey).toBe("{\"key\":1234567890}");

    trivialKey = deterministicPartitionKey({ partitionKey: [1234567890] });
    expect(trivialKey).toBe("[1234567890]");
  });

  it("Returns the new partition key if partition key length grater than 256", () => {
    const key = 'MNqmy5p8zLS3UUqsv592GxePWCL8Se25htwssslPqf32Gv9GqaRq3SOhMC80yFjdyM2rHLcJ7jBqgnj2f7nKsB0cX0xISXUUnsjXfp7CnR7GZnKZFp7QC89mmd6PsD3WqiHr6GDETZGxu4GQf23Y3lwfGTb2D0tXHWUntzBTqjo4T8mfqbbSBuGdW1CU4EIvIqUIlqLUYbuWniyhybKM9Pk7eHOgZeQttnBnVVSOFOe5RSCSdCnkhqMc8HeEUecesadasd'
    const trivialKey = deterministicPartitionKey({ partitionKey: key });
    const expectedKey = getHex(key)
    expect(trivialKey).toBe(expectedKey);
  });
  it("Returns the new partition key from given object  if partition key not exists in object and other key exist in objet", () => {
    const event = { key: 123 }
    const trivialKey = deterministicPartitionKey(event);
    const expectedKey = getHex(JSON.stringify(event))
    expect(trivialKey).toBe(expectedKey);
  });
});
