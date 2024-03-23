"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __pow = Math.pow;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  TypeID: () => TypeID,
  typeid: () => typeid
});
module.exports = __toCommonJS(src_exports);

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

// src/parse_uuid.ts
function parseUUID(uuid) {
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}

// src/base32.ts
var alphabet = "0123456789abcdefghjkmnpqrstvwxyz";
var dec = new Uint8Array([
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  255,
  18,
  19,
  255,
  20,
  21,
  255,
  22,
  23,
  24,
  25,
  26,
  255,
  27,
  28,
  29,
  30,
  31,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255
]);
function encode(src) {
  const dst = new Array(26).fill("");
  if (src.length !== 16) {
    throw new Error("Invalid length");
  }
  dst[0] = alphabet[(src[0] & 224) >> 5];
  dst[1] = alphabet[src[0] & 31];
  dst[2] = alphabet[(src[1] & 248) >> 3];
  dst[3] = alphabet[(src[1] & 7) << 2 | (src[2] & 192) >> 6];
  dst[4] = alphabet[(src[2] & 62) >> 1];
  dst[5] = alphabet[(src[2] & 1) << 4 | (src[3] & 240) >> 4];
  dst[6] = alphabet[(src[3] & 15) << 1 | (src[4] & 128) >> 7];
  dst[7] = alphabet[(src[4] & 124) >> 2];
  dst[8] = alphabet[(src[4] & 3) << 3 | (src[5] & 224) >> 5];
  dst[9] = alphabet[src[5] & 31];
  dst[10] = alphabet[(src[6] & 248) >> 3];
  dst[11] = alphabet[(src[6] & 7) << 2 | (src[7] & 192) >> 6];
  dst[12] = alphabet[(src[7] & 62) >> 1];
  dst[13] = alphabet[(src[7] & 1) << 4 | (src[8] & 240) >> 4];
  dst[14] = alphabet[(src[8] & 15) << 1 | (src[9] & 128) >> 7];
  dst[15] = alphabet[(src[9] & 124) >> 2];
  dst[16] = alphabet[(src[9] & 3) << 3 | (src[10] & 224) >> 5];
  dst[17] = alphabet[src[10] & 31];
  dst[18] = alphabet[(src[11] & 248) >> 3];
  dst[19] = alphabet[(src[11] & 7) << 2 | (src[12] & 192) >> 6];
  dst[20] = alphabet[(src[12] & 62) >> 1];
  dst[21] = alphabet[(src[12] & 1) << 4 | (src[13] & 240) >> 4];
  dst[22] = alphabet[(src[13] & 15) << 1 | (src[14] & 128) >> 7];
  dst[23] = alphabet[(src[14] & 124) >> 2];
  dst[24] = alphabet[(src[14] & 3) << 3 | (src[15] & 224) >> 5];
  dst[25] = alphabet[src[15] & 31];
  return dst.join("");
}
function decode(s) {
  if (s.length !== 26) {
    throw new Error("Invalid length");
  }
  const encoder = new TextEncoder();
  const v = encoder.encode(s);
  if (dec[v[0]] === 255 || dec[v[1]] === 255 || dec[v[2]] === 255 || dec[v[3]] === 255 || dec[v[4]] === 255 || dec[v[5]] === 255 || dec[v[6]] === 255 || dec[v[7]] === 255 || dec[v[8]] === 255 || dec[v[9]] === 255 || dec[v[10]] === 255 || dec[v[11]] === 255 || dec[v[12]] === 255 || dec[v[13]] === 255 || dec[v[14]] === 255 || dec[v[15]] === 255 || dec[v[16]] === 255 || dec[v[17]] === 255 || dec[v[18]] === 255 || dec[v[19]] === 255 || dec[v[20]] === 255 || dec[v[21]] === 255 || dec[v[22]] === 255 || dec[v[23]] === 255 || dec[v[24]] === 255 || dec[v[25]] === 255) {
    throw new Error("Invalid base32 character");
  }
  const id = new Uint8Array(16);
  id[0] = dec[v[0]] << 5 | dec[v[1]];
  id[1] = dec[v[2]] << 3 | dec[v[3]] >> 2;
  id[2] = (dec[v[3]] & 3) << 6 | dec[v[4]] << 1 | dec[v[5]] >> 4;
  id[3] = (dec[v[5]] & 15) << 4 | dec[v[6]] >> 1;
  id[4] = (dec[v[6]] & 1) << 7 | dec[v[7]] << 2 | dec[v[8]] >> 3;
  id[5] = (dec[v[8]] & 7) << 5 | dec[v[9]];
  id[6] = dec[v[10]] << 3 | dec[v[11]] >> 2;
  id[7] = (dec[v[11]] & 3) << 6 | dec[v[12]] << 1 | dec[v[13]] >> 4;
  id[8] = (dec[v[13]] & 15) << 4 | dec[v[14]] >> 1;
  id[9] = (dec[v[14]] & 1) << 7 | dec[v[15]] << 2 | dec[v[16]] >> 3;
  id[10] = (dec[v[16]] & 7) << 5 | dec[v[17]];
  id[11] = dec[v[18]] << 3 | dec[v[19]] >> 2;
  id[12] = (dec[v[19]] & 3) << 6 | dec[v[20]] << 1 | dec[v[21]] >> 4;
  id[13] = (dec[v[21]] & 15) << 4 | dec[v[22]] >> 1;
  id[14] = (dec[v[22]] & 1) << 7 | dec[v[23]] << 2 | dec[v[24]] >> 3;
  id[15] = (dec[v[24]] & 7) << 5 | dec[v[25]];
  return id;
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypeID,
  typeid
});
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
//# sourceMappingURL=index.js.map