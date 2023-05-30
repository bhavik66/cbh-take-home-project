const { getHex } = require('./crypto');

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let partitionKey = TRIVIAL_PARTITION_KEY;

  // If event exists, assign event.partitionKey to partitionKey if it exists,
  // otherwise calculate the hash using getHex and JSON.stringify(event)
  if (event) {
    partitionKey = event?.partitionKey || getHex(JSON.stringify(event));
  }

  // Check if partitionKey exists and is not a string, then stringify it
  if (partitionKey && typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  // If partitionKey's length exceeds the maximum allowed length,
  // calculate the hash using getHex and update partitionKey
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = getHex(partitionKey);
  }

  return partitionKey;
};
