module.exports = {
  apps : [{
    name: 'node-ingesup-b3',
    script: './dist/bundle.js',
    instances: 'max',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
