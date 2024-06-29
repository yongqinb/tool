// babel.config.js  
module.exports = {  
    presets: [  
      ['@babel/preset-env', { targets: "> 0.25%, not dead" }], // 根据你的需要配置 targets  
      '@babel/preset-react',  
    ],  
    // 添加其他 Babel 插件或选项...  
  };