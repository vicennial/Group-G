/*
SQLyog Community Edition- MySQL GUI v8.04 
MySQL - 5.0.37-community-nt : Database - ismartware
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`ismartware` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ismartware`;

/*Table structure for table `isw` */

DROP TABLE IF EXISTS `isw`;

CREATE TABLE `isw` (
  `Temp` varchar(30) default NULL,
  `No` varchar(30) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `isw` */

insert  into `isw`(`Temp`,`No`) values ('HARSHGUPTAMANOJ',NULL),('929 dwarkapuri',NULL),('h','h');

/*Table structure for table `machine` */

DROP TABLE IF EXISTS `machine`;

CREATE TABLE `machine` (
  `machinetype` varchar(30) default '',
  `machinename` varchar(30) NOT NULL,
  `manufacturer` varchar(30) default '',
  `modelname` varchar(30) default '',
  `modelno` varchar(30) default '',
  `date` varchar(30) default NULL,
  `cost` varchar(30) default NULL,
  `warranty` varchar(30) default NULL,
  `buildvolume` varchar(30) default NULL,
  `layerresol` varchar(30) default NULL,
  `extruder` varchar(30) default NULL,
  `size` varchar(30) default NULL,
  `weight` varchar(30) default NULL,
  `consuption` varchar(30) default NULL,
  `connectivity` varchar(30) default NULL,
  `filamentuse` varchar(30) default NULL,
  `nozzledia` varchar(30) default NULL,
  `filament` varchar(30) default NULL,
  `printfile` varchar(30) default NULL,
  `printsize` varchar(30) default NULL,
  `supportfilament` varchar(30) default NULL,
  `resolution` varchar(30) default NULL,
  `accuracy` varchar(30) default NULL,
  `runthrough` varchar(30) default NULL,
  `technology` varchar(30) default NULL,
  `about` varchar(3000) default NULL,
  `image` longblob,
  PRIMARY KEY  (`machinename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `machine` */

insert  into `machine`(`machinetype`,`machinename`,`manufacturer`,`modelname`,`modelno`,`date`,`cost`,`warranty`,`buildvolume`,`layerresol`,`extruder`,`size`,`weight`,`consuption`,`connectivity`,`filamentuse`,`nozzledia`,`filament`,`printfile`,`printsize`,`supportfilament`,`resolution`,`accuracy`,`runthrough`,`technology`,`about`,`image`) values ('','HARSH','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CNC TABLE','HELLO','HEjjh','ghj','ghj','jh','ghj','gjh','gh','gjh','gj','hgjh','ghj','gjh','gjh','ghj','ghj','gjh','gjh','ghj','ghj','ghj','ghj','gjh','gjh','hjg',NULL),('','hjh','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('CNC TABLE','HY','jhkjh','jh','kjh','kjh','jkh','jh','jkh','jkh','kjh','kjh','kjhj','hkj','hkj','hjh','jkh','jkh','jkh','hkj','hkj','hkjh','jkh','kjh','jkhkj','hkjh',NULL),('3D Printer','IIT','HELLO','HELLO','HRLLO','jghjg','hjghj','ghj','ghj','hg','hjg','jhg','hg','jhg','hjg','hjg','hjg','hjg','jhg','jh','gjh','ghj','ghj','ghj','ghj','ghj',NULL),('CNC TABLE','IITI','HELLO','HELLO','HELLo','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','h','h','h','h','h','h','h',NULL),('','JENISH','hjgjhg','hjgg','jhg','jhg','hjgjh','ghj','gjh','gjh','ghj','ghj','gjh','ghj','gjh','gjh','gjh','gjh','gjhg','hjg','hjgjh','gjh','gjh','ghj','ghj','gjh',NULL),('3D Printer','KISHAN','KISHAN','KIASHSnj','hgh','ghjg','hjf','hf','hgf','fg','fhg','fhg','fhg','fgh','fgh','fgh','fgh','fgh','fgh','fgh','fgh','fhg','fgh','fgh','fhg','',NULL),('','kk','uhg','jhu','hjh','jh','jhj','hj','hj','hj',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('3D Printer','RAM','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLO','HELLo','hLEO','hjhj','hhg','jhgh','ghj','gjh','gjhg','hj','ghj','ghj','ghjg','hjg','jh','','','',NULL);

/*Table structure for table `registration` */

DROP TABLE IF EXISTS `registration`;

CREATE TABLE `registration` (
  `mtype` varchar(30) default NULL,
  `mname` varchar(30) default NULL,
  `mid` varchar(30) default NULL,
  `mpass` varchar(30) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `registration` */

insert  into `registration`(`mtype`,`mname`,`mid`,`mpass`) values ('Machine','145','145','145'),('<?xml version=\"1.0\"?>\r',NULL,NULL,NULL),('<?mso-application progid=\"Exce',NULL,NULL,NULL),('<Workbook\r',NULL,NULL,NULL),('  xmlns:x=\"urn:schemas-microso',NULL,NULL,NULL),('  xmlns=\"urn:schemas-microsoft',NULL,NULL,NULL),('  xmlns:ss=\"urn:schemas-micros',NULL,NULL,NULL),('\r',NULL,NULL,NULL),('<Styles>\r',NULL,NULL,NULL),(' <Style ss:ID=\"Default\" ss:Nam',NULL,NULL,NULL),('  <Alignment ss:Vertical=\"Bott',NULL,NULL,NULL),('  <Borders/>\r',NULL,NULL,NULL),('  <Font/>\r',NULL,NULL,NULL),('  <Interior/>\r',NULL,NULL,NULL),('  <NumberFormat/>\r',NULL,NULL,NULL),('  <Protection/>\r',NULL,NULL,NULL),(' </Style>\r',NULL,NULL,NULL),(' <Style ss:ID=\"s27\">\r',NULL,NULL,NULL),('  <Font x:Family=\"Swiss\" ss:Co',NULL,NULL,NULL),(' </Style>\r',NULL,NULL,NULL),(' <Style ss:ID=\"s21\">\r',NULL,NULL,NULL),('  <NumberFormat ss:Format=\"yyy',NULL,NULL,NULL),(' </Style>\r',NULL,NULL,NULL),(' <Style ss:ID=\"s22\">\r',NULL,NULL,NULL),('  <NumberFormat ss:Format=\"yyy',NULL,NULL,NULL),(' </Style>\r',NULL,NULL,NULL),(' <Style ss:ID=\"s23\">\r',NULL,NULL,NULL),('  <NumberFormat ss:Format=\"hh:',NULL,NULL,NULL),(' </Style>\r',NULL,NULL,NULL),('</Styles>\r',NULL,NULL,NULL),('\r',NULL,NULL,NULL),(' <Worksheet ss:Name=\"Sheet1\">\r',NULL,NULL,NULL),('  <ss:Table>\r',NULL,NULL,NULL),('   <ss:Row>\r',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('    <ss:Cell  ss:StyleID=\"s27\"',NULL,NULL,NULL),('   </ss:Row>\r',NULL,NULL,NULL),('   <ss:Row>\r',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('   </ss:Row>\r',NULL,NULL,NULL),('   <ss:Row>\r',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('    <ss:Cell><Data ss:Type=\"St',NULL,NULL,NULL),('   </ss:Row>\r',NULL,NULL,NULL),('  </ss:Table>\r',NULL,NULL,NULL),(' </Worksheet>\r',NULL,NULL,NULL),('</Workbook>',NULL,NULL,NULL),('Machine','145','145','145'),('Machine','HARSH','HARSH','HARSH'),('Machine','12','12','12'),('Machine','1','1','1');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(20) default NULL,
  `password` varchar(20) default NULL,
  `id` varchar(20) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`username`,`password`,`id`) values ('HARSH','HARSH','1'),('AMAN','AMAN','2');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
