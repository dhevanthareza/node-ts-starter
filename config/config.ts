interface IDictionary { [index: string]: any }
const config: IDictionary = {
  'development': {
    'username': 'root',
    'password': 'dhevan007',
    'database': 'wingko_development',
    'host': '127.0.0.1',
    'dialect': 'mysql',
    'jwt_secret': 'secret',
    'session_secret': 'secret',
  },
  'test': {
    'username': 'root',
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql',
  },
  'production': {
    'username': 'root',
    'password': 'dhevan007',
    'database': 'wingko',
    'host': '127.0.0.1',
    'dialect': 'mysql',
  },
}
export { config }