const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    { id: 1, nome: "Usuário padrão", login: "user", senha: bcrypt.hashSync('123456', 8), email: "user@abc.com", roles: "USER"  },
    { id: 2, nome: "Administrador do sistema", login: "admin", senha: bcrypt.hashSync('123456', 8), email: "admin@abc.com", roles: "USER;ADMIN"  },
  ]);
};
