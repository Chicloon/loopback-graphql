module.exports = (app) => {
  const User = app.models.User;

  // console.log('adding new fields');
  User.defineProperty('nickname', {
    type: "string",
    required: false,
    index: true,
  });
  User.hasMany(app.models.Message, {
    as: 'messages',
    foreignKey: 'userId',
    description: 'Сообщения пользователя',
  });
  User.hasMany(app.models.Chat, {
    as: 'chats',
    foreignKey: 'userId',
    description: 'Чаты пользователя',
  });

  // Создание нулевого пользователя, если база пустая
  // TODO: пока очень топорно, надо придумать механизм сидирования данных,
  // возможно сделать папку с json данными которые заливаются в новую установку
  User.count((error, count) => {
    if (error) {
      throw new Error(error);
    } else if (count === 0) {
      User.create({ username: 'admin', email: 'admin@example.com', password: 'admin' }, (error, user) => {
        if (error) {
          throw new Error(error);
        } else {
          console.log('Created default user', user);
          app.models.Role.create({ name: 'admin' }, (error, role) => {
            if (error) {
              throw new Error(error);
            } else {
              console.log('Created default role', role);
              app.models.RoleMapping.create({ principalType: 'USER', principalId: user.id, roleId: role.id }, (error, roleMapping) => {
                if (error) {
                  throw new Error(error)
                } else {
                  console.log('Created default role mapping', roleMapping);
                }
              });
            };
          })
        };
      });
    };
  });
};
