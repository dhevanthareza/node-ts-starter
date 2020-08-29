const PermissionList = (MenuId: any, UserId:any) => {
  return [
    { MenuId: MenuId, name: 'index', description: 'Make user can reading data', createdBy: UserId, updatedBy: UserId },
    { MenuId: MenuId, name: 'create', description: 'Make user can create data', createdBy: UserId, updatedBy: UserId },
    { MenuId: MenuId, name: 'update', description: 'Make user can update data', createdBy: UserId, updatedBy: UserId },
    { MenuId: MenuId, name: 'delete', description: 'Make user can delete data', createdBy: UserId, updatedBy: UserId },
  ];
};
export default PermissionList