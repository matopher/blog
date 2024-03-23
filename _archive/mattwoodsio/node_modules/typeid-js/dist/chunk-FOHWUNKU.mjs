import {
  decode,
  encode
} from "./chunk-4WQUCFGE.mjs";
import {
  parseUUID
} from "./chunk-5QL2QZCM.mjs";
import {
  __pow
} from "./chunk-R5Q6Z3GN.mjs";

// node_modules/.pnpm/uuidv7@0.4.4/node_modules/uuidv7/dist/index.js
var DIGITS = "0123456789abcdef";
var UUID = class {
  /** @param bytes - The 16-byte byte array representation. */
  constructor(bytes) {
    this.bytes = bytes;
    if (bytes.length !== 16) {
      throw new TypeError("not 128-bit length");
    }
  }
  /**
   * Builds a byte array from UUIDv7 field values.
   *
   * @param unixTsMs - A 48-bit `unix_ts_ms` field value.
   * @param randA - A 12-bit `rand_a` field value.
   * @param randBHi - The higher 30 bits of 62-bit `rand_b` field value.
   * @param randBLo - The lower 32 bits of 62-bit `rand_b` field value.
   */
  static fromFieldsV7(unixTsMs, randA, randBHi, randBLo) {
    if (!Number.isInteger(unixTsMs) || !Number.isInteger(randA) || !Number.isInteger(randBHi) || !Number.isInteger(randBLo) || unixTsMs < 0 || randA < 0 || randBHi < 0 || randBLo < 0 || unixTsMs > 281474976710655 || randA > 4095 || randBHi > 1073741823 || randBLo > 4294967295) {
      throw new RangeError("invalid field value");
    }
    const bytes = new Uint8Array(16);
    bytes[0] = unixTsMs / __pow(2, 40);
    bytes[1] = unixTsMs / __pow(2, 32);
    bytes[2] = unixTsMs / __pow(2, 24);
    bytes[3] = unixTsMs / __pow(2, 16);
    bytes[4] = unixTsMs / __pow(2, 8);
    bytes[5] = unixTsMs;
    bytes[6] = 112 | randA >>> 8;
    bytes[7] = randA;
    bytes[8] = 128 | randBHi >>> 24;
    bytes[9] = randBHi >>> 16;
    bytes[10] = randBHi >>> 8;
    bytes[11] = randBHi;
    bytes[12] = randBLo >>> 24;
    bytes[13] = randBLo >>> 16;
    bytes[14] = randBLo >>> 8;
    bytes[15] = randBLo;
    return new UUID(bytes);
  }
  /** @returns The 8-4-4-4-12 canonical hexadecimal string representation. */
  toString() {
    let text = "";
    for (let i = 0; i < this.bytes.length; i++) {
      text += DIGITS.charAt(this.bytes[i] >>> 4);
      text += DIGITS.charAt(this.bytes[i] & 15);
      if (i === 3 || i === 5 || i === 7 || i === 9) {
        text += "-";
      }
    }
    return text;
  }
  /** Creates an object from `this`. */
  clone() {
    return new UUID(this.bytes.slice(0));
  }
  /** Returns true if `this` is equivalent to `other`. */
  equals(other) {
    return this.compareTo(other) === 0;
  }
  /**
   * Returns a negative integer, zero, or positive integer if `this` is less
   * than, equal to, or greater than `other`, respectively.
   */
  compareTo(other) {
    for (let i = 0; i < 16; i++) {
      const diff = this.bytes[i] - other.bytes[i];
      if (diff !== 0) {
        return Math.sign(diff);
      }
    }
    return 0;
  }
};
var V7Generator = class {
  constructor() {
    this.timestamp = 0;
    this.counter = 0;
    this.random = new DefaultRandom();
  }
  /**
   * Generates a new UUIDv7 object from the current timestamp, or resets the
   * generator upon significant timestamp rollback.
   *
   * This method returns monotonically increasing UUIDs unless the up-to-date
   * timestamp is significantly (by ten seconds or more) smaller than the one
   * embedded in the immediately preceding UUID. If such a significant clock
   * rollback is detected, this method resets the generator and returns a new
   * UUID based on the current timestamp.
   */
  generate() {
    const value = this.generateOrAbort();
    if (value !== void 0) {
      return value;
    } else {
      this.timestamp = 0;
      return this.generateOrAbort();
    }
  }
  /**
   * Generates a new UUIDv7 object from the current timestamp, or returns
   * `undefined` upon significant timestamp rollback.
   *
   * This method returns monotonically increasing UUIDs unless the up-to-date
   * timestamp is significantly (by ten seconds or more) smaller than the one
   * embedded in the immediately preceding UUID. If such a significant clock
   * rollback is detected, this method aborts and returns `undefined`.
   */
  generateOrAbort() {
    const MAX_COUNTER = 4398046511103;
    const ROLLBACK_ALLOWANCE = 1e4;
    const ts = Date.now();
    if (ts > this.timestamp) {
      this.timestamp = ts;
      this.resetCounter();
    } else if (ts + ROLLBACK_ALLOWANCE > this.timestamp) {
      this.counter++;
      if (this.counter > MAX_COUNTER) {
        this.timestamp++;
        this.resetCounter();
      }
    } else {
      return void 0;
    }
    return UUID.fromFieldsV7(this.timestamp, Math.trunc(this.counter / __pow(2, 30)), this.counter & __pow(2, 30) - 1, this.random.nextUint32());
  }
  /** Initializes the counter at a 42-bit random integer. */
  resetCounter() {
    this.counter = this.random.nextUint32() * 1024 + (this.random.nextUint32() & 1023);
  }
};
var getRandomValues = (buffer) => {
  if (typeof UUIDV7_DENY_WEAK_RNG !== "undefined" && UUIDV7_DENY_WEAK_RNG) {
    throw new Error("no cryptographically strong RNG available");
  }
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = Math.trunc(Math.random() * 65536) * 65536 + Math.trunc(Math.random() * 65536);
  }
  return buffer;
};
if (typeof crypto !== "undefined" && crypto.getRandomValues) {
  getRandomValues = (buffer) => crypto.getRandomValues(buffer);
}
var DefaultRandom = class {
  constructor() {
    this.buffer = new Uint32Array(8);
    this.cursor = 99;
  }
  nextUint32() {
    if (this.cursor >= this.buffer.length) {
      getRandomValues(this.buffer);
      this.cursor = 0;
    }
    return this.buffer[this.cursor++];
  }
};
var defaultGenerator;
var uuidv7obj = () => (defaultGenerator || (defaultGenerator = new V7Generator())).generate();

// src/typeid.ts
function isValidPrefix(str) {
  if (str.length > 63) {
    return false;
  }
  let code;
  let i;
  let len;
  for (i = 0, len = str.length; i < len; i += 1) {
    code = str.charCodeAt(i);
    if (!(code > 96 && code < 123)) {
      return false;
    }
  }
  return true;
}
var TypeID = class {
  constructor(prefix, suffix = "") {
    this.prefix = prefix;
    this.suffix = suffix;
    if (!isValidPrefix(prefix)) {
      throw new Error("Invalid prefix. Must be at most 63 ascii letters [a-z]");
    }
    this.prefix = prefix;
    if (suffix) {
      this.suffix = suffix;
    } else {
      const uuid = uuidv7obj();
      this.suffix = encode(uuid.bytes);
    }
    if (this.suffix.length !== 26) {
      throw new Error(`Invalid length. Suffix should have 26 characters, got ${suffix.length}`);
    }
    if (this.suffix[0] > "7") {
      throw new Error("Invalid suffix. First character must be in the range [0-7]");
    }
    const unused = decode(this.suffix);
  }
  getType() {
    return this.prefix;
  }
  getSuffix() {
    return this.suffix;
  }
  asType(prefix) {
    const self = this;
    if (self.prefix !== prefix) {
      throw new Error(`Cannot convert TypeID of type ${self.prefix} to type ${prefix}`);
    }
    return self;
  }
  toUUIDBytes() {
    return decode(this.suffix);
  }
  toUUID() {
    const uuid = new UUID(this.toUUIDBytes());
    return uuid.toString();
  }
  toString() {
    if (this.prefix === "") {
      return this.suffix;
    }
    return `${this.prefix}_${this.suffix}`;
  }
  static fromString(str) {
    const parts = str.split("_");
    if (parts.length === 1) {
      return new TypeID("", parts[0]);
    }
    if (parts.length === 2) {
      if (parts[0] === "") {
        throw new Error(`Invalid TypeID. Prefix cannot be empty when there's a separator: ${str}`);
      }
      return new TypeID(parts[0], parts[1]);
    }
    throw new Error(`Invalid TypeID string: ${str}`);
  }
  static fromUUIDBytes(prefix, bytes) {
    const suffix = encode(bytes);
    return new TypeID(prefix, suffix);
  }
  static fromUUID(prefix, uuid) {
    const suffix = encode(parseUUID(uuid));
    return new TypeID(prefix, suffix);
  }
};
function typeid(prefix = "", suffix = "") {
  return new TypeID(prefix, suffix);
}

export {
  TypeID,
  typeid
};
/*! Bundled license information:

uuidv7/dist/index.js:
  (**
   * uuidv7: An experimental implementation of the proposed UUID Version 7
   *
   * @license Apache-2.0
   * @copyright 2021-2023 LiosK
   * @packageDocumentation
   *)
*/
//# sourceMappingURL=chunk-FOHWUNKU.mjs.map