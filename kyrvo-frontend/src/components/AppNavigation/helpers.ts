import { MenuParent, MenuSubItem } from 'src/apptypes';
import { Permission } from 'src/models';

export const checkItemNodePermission = (
  permissions: Permission[],
  node: MenuSubItem,
) => {
  if (!node.feature) return true;
  return !!permissions.find(
    (permission) =>
      permission.FeatureId === node.feature &&
      permission.PermissionLevel >= (node.level || 0),
  );
};

export const checkParentNodePermission = (
  permissions: Permission[],
  node: MenuParent,
) => {
  if (!node.features) return true;
  for (const feature of node.features) {
    if (
      permissions.find(
        (permission) =>
          permission.FeatureId === feature &&
          permission.PermissionLevel >= (node.level || 0),
      )
    ) {
      return true;
    }
  }
  return false;
};
