/// <reference types="vitest/importMeta.d.ts" />

class Singleton {
  private static instance: Singleton;

  // コンストラクタをprivateにすることで、外部からのインスタンス化を防ぐ
  private constructor() {
    // 初期化処理
  }

  // インスタンスを取得するためのメソッド
  public static getInstance(): Singleton {
    // インスタンスがまだ作成されていない場合は作成する
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    // 既存のインスタンスを返す
    return Singleton.instance;
  }

  public someMethod() {
    console.log('someMethod');
  }
}

// テスト
if (import.meta.vitest) {
  describe('Singleton', () => {
    const singleton1 = Singleton.getInstance();
    const singleton2 = Singleton.getInstance();
    it('同一のインスタンスである', () => {
      expect(singleton1).toBe(singleton2);
      expect(singleton1).toBeInstanceOf(Singleton);
      expect(singleton2).toBeInstanceOf(Singleton);
    });
  });
}
