var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = StatementService;
Util.inherits(StatementService,BaseService);

function StatementService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('121');
  this._scopes.push('122');
  this._scopes.push('123');
  this._scopes.push('124');
  this._scopes.push('125');
  this._scopes.push('126');
};

StatementService.prototype.getUnitCost = function(CorpNum,ItemCode,success,error) {
  this._executeAction({
    uri : '/Statement/'+ItemCode+'?cfg=UNITCOST',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

StatementService.prototype.checkMgtKeyInUse = function (CorpNum, ItemCode, MgtKey, success, error){
   if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri :'/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    success : function(response){
      if(success) {
        if(response.itemKey != null) {
          success(true);
        } else {
          success(false);
        }
      }
    },
    error : error
  });
};

BaseService.addMethod(StatementService.prototype, "register", function(CorpNum, Statement, success, error){
  this.register(CorpNum,Statement,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "register", function(CorpNum, Statement, UserID, success, error){
  if(Object.keys(Statement).length === 0) {
    this._throwError(-99999999,'명세서정보가 입력되지 않았습니다.',error);
    return;
  }
  var postData = this._stringify(Statement);
  this._executeAction({
    uri : '/Statement',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "update", function(CorpNum, ItemCode, MgtKey, Statement, success, error){
  this.update(CorpNum,ItemCode,MgtKey,Statement,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "update", function(CorpNum, ItemCode, MgtKey, Statement, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  var postData = this._stringify(Statement);
  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'PATCH',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "issue", function(CorpNum, ItemCode, MgtKey, Memo, success, error){
  this.issue(CorpNum,ItemCode,MgtKey,Memo,'',success,error);
});


BaseService.addMethod(StatementService.prototype, "issue", function(CorpNum, ItemCode, MgtKey, Memo, UserID, success, error){
  this.issue(CorpNum,ItemCode,MgtKey,Memo,'',UserID,success,error);
});

BaseService.addMethod(StatementService.prototype, "issue", function(CorpNum, ItemCode, MgtKey, Memo, EmailSubject, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  var req = {
    memo : Memo,
    emailSubject : EmailSubject
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData, 
    Method : 'ISSUE',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "cancel", function(CorpNum, ItemCode, MgtKey, Memo, success, error){
  this.cancel(CorpNum,ItemCode,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "cancel", function(CorpNum, ItemCode, MgtKey, Memo, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo,
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'CANCEL',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "delete", function(CorpNum, ItemCode, MgtKey, success, error){
  this.delete(CorpNum,ItemCode,MgtKey,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "delete", function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

StatementService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/Statement?TG='+TOGO,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
};

BaseService.addMethod(StatementService.prototype, "sendEmail", function(CorpNum, ItemCode, MgtKey, Receiver, success, error){
  this.sendEmail(CorpNum,ItemCode,MgtKey,Receiver,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "sendEmail", function(CorpNum, ItemCode, MgtKey, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    receiver : Receiver
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    Data : postData,
    UserID : UserID,
    Method : 'EMAIL',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "sendSMS", function(CorpNum, ItemCode, MgtKey, Sender, Receiver, Contents, success, error){
  this.sendSMS(CorpNum,ItemCode,MgtKey,Sender,Receiver,Contents,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "sendSMS", function(CorpNum, ItemCode, MgtKey, Sender, Receiver, Contents, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver,
    contents : Contents
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    Data : postData,
    UserID : UserID,
    Method : 'SMS',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(StatementService.prototype, "sendFAX", function(CorpNum, ItemCode, MgtKey, Sender, Receiver, success, error){
  this.sendFAX(CorpNum,ItemCode,MgtKey,Sender,Receiver,'',success,error);
});

BaseService.addMethod(StatementService.prototype, "sendFAX", function(CorpNum, ItemCode, MgtKey, Sender, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    Data : postData,
    UserID : UserID,
    Method : 'FAX',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});


StatementService.prototype.getDetailInfo = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey+'?Detail',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getInfo = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getInfos = function(CorpNum, ItemCode, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'관리번호배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);

  this._executeAction({
    uri : '/Statement/'+ItemCode, 
    CorpNum : CorpNum, 
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getLogs = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey+'/Logs',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getPrintURL = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey+'?TG=PRINT',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getEPrintURL = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey+'?TG=EPRINT',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getMailURL = function(CorpNum, ItemCode, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/'+ItemCode+'/'+MgtKey+'?TG=MAIL',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getMassPrintURL = function(CorpNum, ItemCode, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'관리번호배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);

  this._executeAction({
    uri : '/Statement/'+ItemCode+'?Print',
    CorpNum : CorpNum, 
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
};

StatementService.prototype.attachFile = function(CorpNum, ItemCode, MgtKey, DisplayName, FilePaths, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    DisplayName : DisplayName
  };
  var postData = this._stringify(req);

  var files = [];
  for(var i in FilePaths){
    files.push({
      fileName : FilePaths[i],
      fieldName : "Filedata"
    });
  }

  this._executeAction({
    uri : '/Statement/' + ItemCode + '/' + MgtKey + '/Files',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    Data : postData,
    Files : files, 
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

StatementService.prototype.getFiles = function(CorpNum, ItemCode, MgtKey, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/' + ItemCode + '/' + MgtKey + '/Files',
    CorpNum : CorpNum,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

BaseService.addMethod(StatementService.prototype, "deleteFile", function(CorpNum, ItemCode, MgtKey, FileID, success, error){
  this.deleteFile(CorpNum,ItemCode,MgtKey,FileID,'',success,error);
});


BaseService.addMethod(StatementService.prototype, "deleteFile", function(CorpNum, ItemCode, MgtKey, FileID, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Statement/' + ItemCode + '/' + MgtKey +'/Files/' +FileID,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE', 
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});













