using System.ComponentModel.DataAnnotations;

namespace GreenLife.Server.DTO
{
    public class CompanyDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
