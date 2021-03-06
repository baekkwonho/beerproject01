package controller.json;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import dao.BeerDao;
import dao.BeerTasteInfoDao;
import vo.Beer;
import vo.BeerTasteInfo;
import vo.JsonResult;

@Controller
@RequestMapping("/beertasteinfo/")
public class BeerTasteInfoController {
  
  
  @Autowired BeerTasteInfoDao beerTasteInfoDao;
  @Autowired BeerDao beerDao;
  
  @RequestMapping(path="tasteinfoscno") // scno로 넘긴 값을 받는 메서드
  public Object printTasteInfoScno(int no) throws Exception{
    try {
      Beer beer = beerDao.selectOneCate(no); // brno 찾기위해 scno넘겨주고 리스트중 상위에 객체를 받아온다.
      List<BeerTasteInfo> list = beerTasteInfoDao.selectList(beer.getNo());
      if (list.size() == 1) {
        return JsonResult.success(list);
      } else {
        List<BeerTasteInfo> resultList = tasteCalc(list);
        return JsonResult.success(resultList);
      }
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="tasteinfobrno") // brno로 넘긴 값을 받는 메서드
  public Object printTasteInfoBrno(int no) throws Exception{
    try {
      
      List<BeerTasteInfo> list = beerTasteInfoDao.selectList(no);
      if (list.size() == 1) {
        return JsonResult.success(list);
      } else {
        List<BeerTasteInfo> resultList = tasteCalc(list);
        return JsonResult.success(resultList);
      }
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="tasteinfoctryno") // ctryno로 넘긴 값을 받는 메서드
  public Object printTasteInfoCtryno(int no) throws Exception{
    try {
      Beer beer = beerDao.selectOneCtry(no);// brno 찾기위해 ctryno넘겨주고 리스트중 상위에 객체를 받아온다.
      List<BeerTasteInfo> list = beerTasteInfoDao.selectList(beer.getNo());
      if (list.size() == 1) {
        return JsonResult.success(list);
      } else {
        List<BeerTasteInfo> resultList = tasteCalc(list);
        return JsonResult.success(resultList);
      }
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  
  
  /*
  @RequestMapping(path="list") // cateno로 넘긴 값을 받는 메서드
  public Object list(int no) throws Exception{
    try {
      Beer beer = beerDao.selectOneCate(no);
      List<BeerTasteInfo> list = beerTasteInfoDao.selectList(beer.getNo());
      if (list.size() == 1) {
        return JsonResult.success(list);
      } else {
        List<BeerTasteInfo> resultList = tasteCalc(list);
        return JsonResult.success(resultList);
      }
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detailList")  //brno로 넘긴 값을 받는 메서드
  public Object detailList(int no) throws Exception{
    
    try {
      
      List<BeerTasteInfo> list = beerTasteInfoDao.selectList(no);
      if (list.size() == 1) {
        return JsonResult.success(list);
      } else {
        List<BeerTasteInfo> resultList = tasteCalc(list);
        return JsonResult.success(resultList);
      }
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  */
  
  
  @RequestMapping(path="add")
  public Object add(BeerTasteInfo beerTasteInfo) throws Exception {
    
    
    try {
      beerTasteInfoDao.insert(beerTasteInfo);
      return JsonResult.success(beerTasteInfo);
      
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
 
  
  
  
  List<BeerTasteInfo> tasteCalc(List<BeerTasteInfo> list) {
    
    BeerTasteInfo temp = list.get(0);
    for (int i = 0; i < list.size() - 1; i++) {
      BeerTasteInfo ct = list.get(i + 1);
      temp.setBitter(temp.getBitter() + ct.getBitter());
      temp.setSour(temp.getSour() + ct.getSour());
      temp.setSweet(temp.getSweet() + ct.getSweet());
      temp.setSparkle(temp.getSparkle() + ct.getSparkle());
      temp.setBody(temp.getBody() + ct.getBody());
      temp.setAroma(temp.getAroma() + ct.getAroma());
      temp.setScore(temp.getScore() + ct.getScore());
    }
    temp.setBitter(temp.getBitter() / list.size());
    temp.setSour(temp.getSour() / list.size());
    temp.setSweet(temp.getSweet() / list.size());
    temp.setSparkle(temp.getSparkle() / list.size());
    temp.setBody(temp.getBody() / list.size());
    temp.setAroma(temp.getAroma() / list.size());
    temp.setScore((float)((Math.round((temp.getScore() / list.size())*10)/10.0)));
    
    List<BeerTasteInfo> resultList = new ArrayList<BeerTasteInfo>();
    resultList.add(temp);
    
    return resultList;
  }
  
  
}


