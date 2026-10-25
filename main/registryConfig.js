var regedit = require('regedit')

var installPath = process.execPath

var keysToCreate = [
  'HKCU\\Software\\Classes\\Koike',
  'HKCU\\Software\\Classes\\Koike\\Application',
  'HKCU\\Software\\Classes\\Koike\\DefaulIcon',
  'HKCU\\Software\\Classes\\Koike\\shell\\open\\command',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\FileAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\StartMenu',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\URLAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\DefaultIcon',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\InstallInfo',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\shell\\open\\command'
]

var registryConfig = {
  'HKCU\\Software\\RegisteredApplications': {
    Koike: {
      value: 'Software\\Clients\\StartMenuInternet\\Koike\\Capabilities',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Koike': {
    default: {
      value: 'Koike Browser Document',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\Koike\\Application': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    },
    ApplicationName: {
      value: 'Koike',
      type: 'REG_SZ'
    },
    AppUserModelId: {
      value: 'Koike',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Koike\\DefaulIcon': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Koike\\shell\\open\\command': {
    default: {
      value: '"' + installPath + '" "%1"',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
    Koike: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
    Koike: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\FileAssociations': {
    '.htm': {
      value: 'Koike',
      type: 'REG_SZ'
    },
    '.html': {
      value: 'Koike',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\StartMenu': {
    StartMenuInternet: {
      value: 'Koike',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\Capabilities\\URLAssociations': {
    http: {
      value: 'Koike',
      type: 'REG_SZ'
    },
    https: {
      value: 'Koike',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\DefaultIcon': {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\InstallInfo': {
    IconsVisible: {
      value: 1,
      type: 'REG_DWORD'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Koike\\shell\\open\\command': {
    default: {
      value: installPath,
      type: 'REG_DEFAULT'
    }
  }
}

var registryInstaller = {
  install: function () {
    return new Promise(function (resolve, reject) {
      regedit.createKey(keysToCreate, function (err) {
        regedit.putValue(registryConfig, function (err) {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
      })
    })
  },
  uninstall: function () {
    return new Promise(function (resolve, reject) {
      regedit.deleteKey(keysToCreate, function (err) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}
