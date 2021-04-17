/**
 * Added rules for react-spring to fix the bugs for @Nivo
 * https://github.com/plouc/nivo/issues/1290
 * 
 */
module.exports = {    
    webpack: config => {
      config.module.rules.push({
        test: /react-spring/,
        sideEffects: true,
      })
  
      return config
    },
  }