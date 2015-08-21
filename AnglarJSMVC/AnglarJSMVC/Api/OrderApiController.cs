using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using AnglarJSMVC.Models;
using Antlr.Runtime;

namespace AnglarJSMVC.Api
{
    public class OrderApiController : ApiController
    {


        [System.Web.Http.HttpGet]
        public  IList<OrderListVM> List()
        {
            var list = new List<OrderListVM>();
            list.Add(new OrderListVM {Name = "yws",Age = "20",Mobile = "18298010321"});
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            list.Add(new OrderListVM { Name = "yws", Age = "20", Mobile = "18298010321" });
            return list;
        }

    }
}
