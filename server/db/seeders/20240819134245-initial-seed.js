'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      username: 'Лев Тропин',
      email: "lev@mail.ru",
      password: await bcrypt.hash('12345', 10),
      role: 'admin',
      },
      {
        username: 'Владислав Песков',
        email: "xfemidax@mail.ru",
        password: await bcrypt.hash('123', 10),
        role: 'admin',
        },
        {
          username: 'Влад Песков',
          email: "xfemidaxx@mail.ru",
          password: await bcrypt.hash('123', 10),
          role: 'user',
          }
    ], {});
    await queryInterface.bulkInsert(
      'Lawyers', [
        {
          userId: 1,
          name: 'Владислав Песков',
          education: 'Высшее юридическое образование',
          description: 'Специалист по гражданскому и уголовному праву.',
          photo: 'https://static.tildacdn.com/tild6661-6334-4238-b333-366637346538/13.jpg',
          phone: '+7 916 578 09 36',
          telegram: '@VladislavPeskov',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          name: 'Лев Тропин',
          education: 'Высшее юридическое образование',
          description: 'Специалист по гражданскому и уголовному праву.',
          photo: 'https://avatars.mds.yandex.net/get-ydo/3614230/2a0000017b9bc5ad561e76c1c73ce971395a/diploma',
          phone: '+7 916 578 09 09',
          telegram: '@LevTropin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
