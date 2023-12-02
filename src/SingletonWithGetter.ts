/// <reference types="vitest/importMeta.d.ts" />

type Getter<T> = () => T;
type Factory<T> = () => T;

// singleton関数は、与えられたファクトリ関数を使ってSingletonパターンを実装します。
// この関数はGetter<T>型の関数を返し、同じインスタンスを繰り返し返すようにします。
export const singleton = <T>(factory: Factory<T>): Getter<T> =>
  ((): Getter<T> => {
    let memo: T | null = null;
    return () => (memo ? memo : (memo = factory()));
  })();

// Singletonクラスのインスタンスを生成するためのファクトリ関数です。
const createSingletonInstance = () => new Singleton();
// 生成されたSingletonインスタンスを取得するためのGetter関数です。
export const getSingletonInstance = singleton(createSingletonInstance);

class Singleton {
  public someMethod() {
    console.log('someMethod');
  }
}

// テスト
if (import.meta.vitest) {
  describe('singleton', () => {
    it('同一でない', () => {
      const factory = () => ({});
      const x = factory();
      const y = factory();
      expect(x).not.toBe(y);
    });
    it('同一である', () => {
      const factory = () => ({});
      const getter = singleton(factory);
      const x = getter();
      const y = getter();
      expect(x).toBe(y);
    });
  });

  describe('Singleton', () => {
    const singleton1 = getSingletonInstance();
    const singleton2 = getSingletonInstance();
    it('同一のインスタンスである', () => {
      expect(singleton1).toBe(singleton2);
      expect(singleton1).toBeInstanceOf(Singleton);
      expect(singleton2).toBeInstanceOf(Singleton);
    });
    it('同一のインスタンスでない', () => {
      expect(singleton1).not.toBe(new Singleton());
      expect(singleton2).not.toBe(new Singleton());
    });
  });
}
