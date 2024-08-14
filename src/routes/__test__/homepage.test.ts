import request from "supertest"
import { app } from "../../app";


describe('Is the Server Is runnig or not', () => { 

    it("should return server is live message when the server is runnig " , async() =>{
        const res = await request(app).get("/");
        expect(res.body).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.message).toBe("Server is Live")
    })
    it('should return 404 and an error message', async () => {
        const res = await request(app).get('/invalid-route');
    
        expect(res.status).toBe(404);
        expect(res.body).toBeDefined();
        expect(res.body.errors).toEqual([
          {
            message: 'Not Found'
          }
        ]);
      });
})