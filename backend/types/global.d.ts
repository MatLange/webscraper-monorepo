// global.d.ts
declare namespace NodeJS {
    interface Global {
      agent: any;
    }
  }
  
  declare var global: NodeJS.Global;