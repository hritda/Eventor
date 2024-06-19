using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eventor.Models
{
    public class BaseModel
    {
        public string uid{ get; set; }=Guid.NewGuid().ToString();
        public string? MadeBy
        { get; set; }
        public DateTime MadeOn { get; set; }=DateTime.Now;
        public string? ChangeBy
        { get; set; }
        public DateTime ChangeOn { get; set; }=DateTime.Now;

    }
}