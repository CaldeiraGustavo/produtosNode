/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del()
  await knex('produtos').insert([
    { id: 1, descricao: "Amendoin", valor: 25.00, marca: "Pichu"  },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Hemmer"  },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
    { id: 4, descricao: "Cerveja 473ml", valor: 15.20, marca: "Heineken"  },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
]);
};
