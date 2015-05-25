package personal.jeremy.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import personal.jeremy.model.JWTResponse;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by jeremy on 15/5/22.
 */
@Controller
public class AuthController {

    @RequestMapping(value= "/login", method = RequestMethod.POST)
    public @ResponseBody JWTResponse login(@RequestParam String username, @RequestParam String password){
        Key key = MacProvider.generateKey();
        Map<String, Object> claims = new HashMap<String , Object>();
        claims.put("username", username);
        String id_token = Jwts.builder().setIssuer("jeremy.com").setClaims(claims).signWith(SignatureAlgorithm.HS512, key).compact();
        JWTResponse resp = new JWTResponse();
        resp.setId_token(id_token);
        return resp;
    }

    @RequestMapping(value= "/signup", method = RequestMethod.POST)
    public @ResponseBody JWTResponse login(@RequestParam String username, @RequestParam String password, @RequestParam String extra){
        Key key = MacProvider.generateKey();
        Map<String, Object> claims = new HashMap<String , Object>();
        claims.put("username", username);
        String id_token = Jwts.builder().setIssuer("jeremy.com").setClaims(claims).signWith(SignatureAlgorithm.HS512, key).compact();
        JWTResponse resp = new JWTResponse();
        resp.setId_token(id_token);
        return resp;
    }
}
