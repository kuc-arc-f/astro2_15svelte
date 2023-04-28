

const request = require('supertest')
import {app}  from '../../../index'

//data
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

//
describe('GET /tasks/show', () => {
  let taskId;

  beforeAll(async () => {

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
//    await request(app).delete(`/tasks/${taskId}`);
  });  
  //
  test('Should Show task successfully', async () => {
    const response = await request(app)
      .get('/tasks/show/' + String(taskId))
    expect(response.status).toBe(200);
console.log(response.body);
    expect(response.body).toHaveProperty('id', taskId);
    expect(response.body).toHaveProperty('user_id', newTask.user_id);
    expect(response.body).toHaveProperty('title', newTask.title);
    expect(response.body).toHaveProperty('content', newTask.content);
    expect(response.body).toHaveProperty('priority', newTask.priority);
/*
    expect(response.body).toHaveProperty('category_id', 1);
    expect(response.body).toHaveProperty('completed', false);
    expect(response.body).toHaveProperty('tag_1', 'tag1');
    expect(response.body).toHaveProperty('tag_2', 'tag2');
    expect(response.body).toHaveProperty('tag_3', 'tag3');
    expect(response.body).toHaveProperty('tag_4', 'tag4');
    expect(response.body).toHaveProperty('tag_5', 'tag5');
    expect(response.body).toHaveProperty('complete_date', null);
    */
//    expect(response.body.ret).toBe("OK");    
  });  
});