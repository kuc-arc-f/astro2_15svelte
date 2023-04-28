

const request = require('supertest')
import {app}  from '../../../index'


describe('POST /tasks/update', () => {
  let taskId;

  beforeAll(async () => {
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

    expect(response.status).toBe(200);
console.log("#create.body");
    taskId = response.body.data.id;
console.log("id=", response.body.data.id);
//    expect(response.body).toHaveProperty('id');
  });
  afterAll(async () => {
    // delete the task created for testing
//    await request(app).delete(`/tasks/${taskId}`);
  });  
  //
  test('Should update task successfully', async () => {
    const item = {
      id: taskId
    }
    const response = await request(app)
      .post('/tasks/delete')
      .send(item);

    expect(response.status).toBe(200);
    expect(response.body.ret).toBe("OK");    
  });  
});