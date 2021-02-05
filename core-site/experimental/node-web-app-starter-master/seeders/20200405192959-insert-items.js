'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      { createdAt: new Date(), updatedAt: new Date(), name: 'Gravel', imageName: 'gravel.png', amount: 15, description: 'A loose collection of rocks I found in my yard.' },
      { createdAt: new Date(), updatedAt: new Date(), name: 'Lint', imageName: 'lint.jpeg', amount: 172, description: 'These are the keepings from my clothes dryer.' },
      { createdAt: new Date(), updatedAt: new Date(), name: 'Thread', imageName: 'thread.jpeg', amount: 17, description: 'A lot of this I got from my grandma when she decided that I needed to learn to sew. Since that time, I have just kept it in the kitchen junk drawer.' },
      { createdAt: new Date(), updatedAt: new Date(), name: 'Horseshoe', imageName: 'horseshoe.jpeg', amount: 1, description: 'Something to keep around for luck.' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', {
      name: ['Gravel', 'Lint', 'Thread', 'Horseshoe']
    });
  }
};
