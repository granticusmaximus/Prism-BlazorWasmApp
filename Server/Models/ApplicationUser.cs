using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Prism.Server.Models;

public class ApplicationUser : IdentityUser
{
    [Display(Name = "First Name")]
    public required string FirstName { get; set; }

    [Display(Name = "Last Name")]
    public required string LastName { get; set; }

    [NotMapped]
    [Display(Name = "Full Name")]
    public string FullName
    {
        get { return FirstName + " " + LastName; }
    }

    public string? Address { get; set; }
    public required string Cell { get; set; }

    [Display(Name = "Profile Picture")]
    public required byte[] ProfilePicture { get; set; }

    [Display(Name = "Gender")]
    public Gender Gender { get; set; }
    public string? City { get; set; }
    public string? Designation { get; set; }
    public DateTime RegisterDate { get; set; } = DateTime.Now;
}

public enum Gender
{
    Male,
    Female
}