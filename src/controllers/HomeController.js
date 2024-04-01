class HomeController {
    async index(req, res) {
      res.json('Api_hzine');
    }
  }
  
  export default new HomeController();
  