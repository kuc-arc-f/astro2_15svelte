

const request = require('supertest')
import {app}  from '../../../index'


describe('POST /tasks/create', () => {
  it('should create a new task', async () => {
    const newTask = {
      user_id: 1,
      title: 'Test Task',
      content: 'This is a test task.',
      priority: 1,
      category_id: 1,
      completed: 0,
      tag_1: 'test',
      tag_2: '',
      tag_3: '',
      tag_4: '',
      tag_5: '',
      complete_date: '',
    };

    const response = await request(app)
      .post('/tasks/create')
      .send(newTask);
//console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.ret).toBe("OK");
//    expect(response.body).toHaveProperty('id');
  });
});