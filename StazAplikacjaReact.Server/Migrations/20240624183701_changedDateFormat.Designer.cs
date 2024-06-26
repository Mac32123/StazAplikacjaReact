﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StazAplikacjaReact.Server.Data;

#nullable disable

namespace StazAplikacjaReact.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240624183701_changedDateFormat")]
    partial class changedDateFormat
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebApplication1.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Służbowy"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Prywatny"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Inny"
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("OtherCategory")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Contacts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BirthDate = new DateTime(2003, 6, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "s189033@student.pg.edu.pl",
                            Name = "Maciej",
                            Password = "SeCrEt*!",
                            PhoneNumber = "662066180",
                            Surname = "Lica"
                        },
                        new
                        {
                            Id = 2,
                            BirthDate = new DateTime(45, 3, 6, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "loremipsum@example.com",
                            Name = "Lorem",
                            Password = "SeCrEt2*!",
                            PhoneNumber = "000000000",
                            Surname = "Ipsum"
                        });
                });

            modelBuilder.Entity("WebApplication1.Models.SluzbowySubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SluzbowySubCategories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Szef"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Klient"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Współpracownik"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Inny"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
