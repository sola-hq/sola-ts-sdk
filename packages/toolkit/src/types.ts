import type { BN } from './bn/bn.js';

export type Nullable<T> = T | null | undefined;

/**
 * @description Interface for objects that have a toBigInt method
 * @interface ToBigInt
 * @property toBigInt - A function that returns a bigint
 */
export interface ToBigInt {
  toBigInt: () => bigint;
}

/**
 * @description Interface for objects that have a toBn method
 * @interface ToBn
 * @property toBn - A function that returns a BN
 */
export interface ToBn {
  toBn: () => BN;
}

export interface ToBnOptions {
  /** Convert in LE format */
  isLe?: boolean;
  /** Number is signed, apply two's complement */
  isNegative?: boolean;
}

/**
 * @description Interface for options to convert to a number
 * @interface ToNumberOptions
 * @property isLe - Convert in LE format
 * @property isNegative - Number is signed, apply two's complement
 * @property bitLength - Limit to the specified bitLength, despite input length
 */
export interface ToNumberOptions extends ToBnOptions {
  /** Limit to the specified bitLength, despite input length */
  bitLength?: number;
}

export type U8aLike = number[] | Uint8Array | string;

export type BoolLike = boolean | number | string;
